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

export async function createCabin(newCabin) {
	//https://wycjbzjtochxxulzwehw.supabase.co/storage/v1/object/public/cabin-images/cabin_001.jpg

	//if there are  slashes in cabin name, supabase will create folders based on that, to avoid that we replace / with nothing
	const imageName = `${Math.random()}-${
		newCabin.image.name
	}`.replaceAll("/", "");

	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	//1. create cabin
	const { data, error } = await supabase
		.from("cabins")
		.insert([{ ...newCabin, image: imagePath }])
		.select();

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be created");
	}

	//2. upload image

	// // Create Supabase client
	// const supabase = createClient(
	// 	"your_project_url",
	// 	"your_supabase_api_key"
	// );

	// Upload file using standard upload
	// async function uploadFile(file) {}
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
