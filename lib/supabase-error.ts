import { PostgrestError } from "@supabase/supabase-js";

export function getSupabaseErrorMessage(
  error: PostgrestError | Error | null
): string {
  if (!error) {
    return "Unknown error.";
  }

  if ("code" in error) {
    switch (error.code) {
      case "42501":
        return "You don't have permission to perform this action.";

      case "23505":
        return "This record already exists.";

      case "23503":
        return "This record is linked to other data.";

      case "PGRST116":
        return "Record not found.";

      default:
        break;
    }
  }

  return error.message || "Unexpected error.";
}