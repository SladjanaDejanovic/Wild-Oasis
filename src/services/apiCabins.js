// import { createClient } from "@supabase/supabase-js";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be laoded");
	}
	return data;
}

export async function createEditCabin(newCabin, id) {
	console.log(newCabin, id);
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

	//if there are  slashes in cabin name, supabase will create folders based on that, to avoid that we replace / with nothing
	const imageName = `${Math.random()}-${
		newCabin.image.name
	}`.replaceAll("/", "");

	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	//1. Create/edit cabin
	let query = supabase.from("cabins");

	// CREATE
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

	// EDIT
	if (id)
		query = query
			.update({ ...newCabin, image: imagePath })
			.eq("id", id)
			.select();

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be created");
	}

	//2. upload image
	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	// 3. delete cabin if there was an error uploading image
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.error(storageError);
		throw new Error(
			"Cabin image could not be uploaded and the cabin was not created"
		);
	}

	return data;
}

export async function deleteCabin(id) {
	const { error } = await supabase
		.from("cabins")
		.delete()
		.eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}
}
