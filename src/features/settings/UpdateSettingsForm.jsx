import { useMutation, useQuery } from "@tanstack/react-query";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { getSettings, updateSetting } from "../../services/apiSettings";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";

function UpdateSettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: settings,
    isLoading: settingsLoading,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const { isLoading: updateLoading, mutate } = useMutation({
    mutationFn: (data) => updateSetting(data),
    onSuccess: () => {
      toast.success("Settings Successfully Updated");
    },
    onError: (err) => toast.error(err.message),
  });

  const {
    breakfast_price,
    max_booking_length,
    max_guests_per_booking,
    min_booking_length,
  } = settings || {};

  function onSubmit(data) {
    mutate(data);
  }

  if (settingsLoading) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Minimum nights/booking">
        <Input
          disabled={updateLoading}
          type="number"
          id="min-nights"
          defaultValue={min_booking_length}
          {...register("min_booking_length", {
            required: "Minimum nights/booking field is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          disabled={updateLoading}
          type="number"
          id="max-nights"
          defaultValue={max_booking_length}
          {...register("max_booking_length", {
            required: "Maximum nights/booking field is required",
          })}
        />
      </FormRow>
      {/* <FormRow label="Maximum guests/booking">
        <Input
          disabled={updateLoading}
          type="number"
          id="max-guests"
          defaultValue={max_guests_per_booking}
          {...register("max_guests_per_booking", {
            required: "Maximum guests/booking field is required",
          })}
        />
      </FormRow> */}
      <FormRow label="Breakfast price">
        <Input
          disabled={updateLoading}
          type="number"
          id="breakfast-price"
          defaultValue={breakfast_price}
          {...register("breakfast_price", {
            required: "Breakfast price field is required",
          })}
        />
      </FormRow>

      <Button margintop="20px" disabled={updateLoading}>
        Update
      </Button>
    </Form>
  );
}

export default UpdateSettingsForm;
