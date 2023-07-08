import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

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
  type = 'text',
}: FormFieldProps) {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-4">
      <Label htmlFor={title} className="w-full">
        {title}
      </Label>
      {isTextArea ? (
        <Textarea
          id={title}
          placeholder={placeholder}
          value={state}
          onChange={(event) => setState(event.target.value)}
          required
        />
      ) : (
        <Input
          type={type}
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
