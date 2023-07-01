type FormFieldProps = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextArea?: boolean;
  setState: (value: string) => void;
};

function FormField({
  placeholder,
  setState,
  state,
  title,
  isTextArea,
  type = "text",
}: FormFieldProps) {
  return (
    <div className="flexStart w-full flex-col gap-4">
      <label htmlFor="" className="w-full text-gray-100">
        {title}
      </label>
      {isTextArea ? (
        <textarea
          className="form_field-input"
          placeholder={placeholder}
          value={state}
          onChange={(event) => setState(event.target.value)}
          required
        />
      ) : (
        <input
          type={type}
          className="form_field-input"
          placeholder={placeholder}
          value={state}
          onChange={(event) => setState(event.target.value)}
          required
        />
      )}
    </div>
  );
}

export default FormField;
