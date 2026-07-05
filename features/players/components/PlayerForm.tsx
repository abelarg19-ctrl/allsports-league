"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const playerSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  nickname: z.string().optional(),
  number: z.number().optional(),
  position: z.string().optional(),
});

export type PlayerFormValues = z.infer<typeof playerSchema>;

interface PlayerFormProps {
  mode: "create" | "edit";
  loading?: boolean;
  defaultValues?: Partial<PlayerFormValues>;
  onSubmit: (values: PlayerFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export default function PlayerForm({
  mode,
  loading = false,
  defaultValues,
  onSubmit,
  onCancel,
}: PlayerFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlayerFormValues>({
    resolver: zodResolver(playerSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      <div>
        <Label>First Name</Label>
        <Input {...register("first_name")} />
        {errors.first_name && (
          <p className="text-sm text-red-500">
            {errors.first_name.message}
          </p>
        )}
      </div>

      <div>
        <Label>Last Name</Label>
        <Input {...register("last_name")} />
        {errors.last_name && (
          <p className="text-sm text-red-500">
            {errors.last_name.message}
          </p>
        )}
      </div>

      <div>
        <Label>Nickname</Label>
        <Input {...register("nickname")} />
      </div>

      <div>
        <Label>Number</Label>
        <Input
  type="number"
  {...register("number", {
    setValueAs: (value) =>
      value === "" ? undefined : Number(value),
  })}
/>
      </div>

      <div>
        <Label>Position</Label>
        <Input {...register("position")} />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}

        <Button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : mode === "create"
            ? "Create Player"
            : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}