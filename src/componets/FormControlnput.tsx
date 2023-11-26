import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FC } from "react";

type FormControlInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  errors: any;
  register: any;
  validation?: any;
};

const FormControlInput: FC<FormControlInputProps> = ({
  name,
  label,
  placeholder,
  errors,
  register,
  validation,
}) => {
  return (
    <FormControl isInvalid={!!errors[name]} position="relative" pb={4}>
      <FormLabel>{label}</FormLabel>
      <Input
        type="text"
        placeholder={placeholder}
        {...register(name, {
          ...validation,
        })}
      />
      {errors[name] && (
        <FormHelperText position="absolute" bottom={-2} color="red.500">
          {errors[name].message as string}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormControlInput;
