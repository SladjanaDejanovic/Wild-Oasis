import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://wycjbzjtochxxulzwehw.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5Y2piemp0b2NoeHh1bHp3ZWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA4OTM3MDYsImV4cCI6MjAzNjQ2OTcwNn0.caiR5Jg0Qy3Q3W9OsfGJAeW7YtN1XeONzzB8SHTnXg0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
