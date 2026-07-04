"use client";

    import { useForm } from "react-hook-form";
    import { z } from "zod";
    import { zodResolver } from "@hookform/resolvers/zod";

    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Textarea } from "@/components/ui/textarea";

    const teamSchema = z.object({
      name: z.string().min(3, "Team name is required"),
      tag: z.string().min(2, "Tag is required"),
      description: z.string().optional(),
    });

    export type TeamFormValues = z.infer<typeof teamSchema>;

    interface TeamFormProps {
      mode: "create" | "edit";
      loading?: boolean;
      defaultValues?: Partial<TeamFormValues>;
      onSubmit: (values: TeamFormValues) => void | Promise<void>;
      onCancel?: () => void;
    }

    export default function TeamForm({
      mode,
      loading = false,
      defaultValues,
      onSubmit,
      onCancel,
    }: TeamFormProps) {
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<TeamFormValues>({
        resolver: zodResolver(teamSchema),
        defaultValues,
      });

      return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label>Team Name</Label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label>Tag</Label>
            <Input {...register("tag")} />
            {errors.tag && (
              <p className="text-sm text-red-500">{errors.tag.message}</p>
            )}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...register("description")} />
          </div>

          <div className="flex justify-end gap-2">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}

            <Button type="submit" disabled={loading}>
              {loading
                ? "Saving..."
                : mode === "create"
                ? "Create Team"
                : "Save Changes"}
            </Button>
          </div>
        </form>
      );
    }