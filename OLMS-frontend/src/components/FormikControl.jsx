import { ErrorMessage, Field, useFormikContext } from 'formik';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, InputAdornment, TextField } from "@mui/material";

const datePickerTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: "#000000", // Default label color
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#b4d0ff", // Light background
            borderRadius: "24px", // Rounded corners
            "& fieldset": {
              borderColor: "#1976d2", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "#004ba0", // Hover border color
            },
            "&.Mui-focused fieldset": {
              borderColor: "#000000", // Focus border color
            },
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#1976d2", // Selected date background
            color: "#fff", // Selected date text
          },
          "&:hover": {
            backgroundColor: "#004ba0", // Hover background
          },
        },
      },
    },
  },
});


const FormikControl = ({
  control,
  name,
  classNam,
  rightIcon,
  fieldcls,
  ...rest
}) => {
  const { setFieldValue } = useFormikContext();

  switch (control) {
    case 'input':
      return (
        <div className="mb-4 relative">
          <fieldset
            className={`${fieldcls} border-2 border-black max-w-xs rounded-3xl px-1 py-1`}
          >
            <legend className="px-1 text-black text-sm">{name}</legend>
            <div className="relative">
              <Field
                type="input"
                id={name}
                name={name}
                className={`${classNam} appearance-none rounded-xl w-full text-black bg-login px-3 py-2 bg-transparent focus:outline-none`}
                autoComplete="off"
                {...rest}
              />
              {rightIcon && (
                <div className="absolute inset-y-0 right-3 flex items-center">
                  {rightIcon}
                </div>
              )}
            </div>
          </fieldset>
          <ErrorMessage
            name={name}
            component="div"
            className="text-red-600 text-center text-sm font-mono mt-4"
          />
        </div>
      );

    case 'checkbox':
      return (
        <div className="mb-2 text-sm">
          <label htmlFor={name}>
            <div className="flex items-center gap-1">
              <Field
                type="checkbox"
                id={name}
                name={name}
                className={`${classNam} size-3 ml-2`}
                {...rest}
              />
              {rest.label}
            </div>
          </label>
        </div>
      );

    case 'textarea':
      return (
        <div className="mb-2 text-sm">
          <label htmlFor={name} className="block font-semibold mb-1">
            {rest.label}
          </label>
          <Field
            as="textarea"
            id={name}
            name={name}
            className={`w-full h-36 resize-none p-2 border rounded-md bg-login focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              classNam
            }`}
            {...rest}
          />
          <ErrorMessage
            name={name}
            component="div"
            className="text-red-600 text-sm mt-1"
          />
        </div>
    );
    case 'date':
      return (
      <ThemeProvider theme={datePickerTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Field name={name}>
            {({ field, form }) => (
              <DatePicker
                {...rest}
                value={field.value || null}
                format="DD/MM/YYYY"
                minDate={rest.minDate}
                onChange={(newValue) => form.setFieldValue(name, newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    error={Boolean(form.errors[name] && form.touched[name])}
                    helperText={
                      form.errors[name] && form.touched[name] ? form.errors[name] : null
                    }
                  />
                )}
              />
            )}
          </Field>
        </LocalizationProvider>
      </ThemeProvider>
    );  
    default:
      return null;
  
    case'textfield' :
    return(
      <ThemeProvider theme={datePickerTheme}>
          <Box
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          >
            <Field name={name}>
              {({ field, form }) => (
                <TextField
                  {...field}
                  {...rest}
                  id={name}
                  label={rest.label}
                  value={field.value}
                  variant="outlined"
                  autoComplete="off"
                  error={Boolean(form.errors[name] && form.touched[name])}
                  helperText={
                    form.errors[name] && form.touched[name]
                      ? form.errors[name]
                      : null
                  }
                />
              )}
              
            </Field>
          </Box>
        </ThemeProvider>
    );
    case 'multiline':
      return(
        <Box>
          <TextField

          multiline
          />
        </Box>
      );
  }
  
};

export default FormikControl;
