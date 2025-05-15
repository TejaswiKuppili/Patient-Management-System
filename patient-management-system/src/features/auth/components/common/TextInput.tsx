import { Field, ErrorMessage } from 'formik';
import './TextInput.css';

interface Props {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
}

export const TextInput = ({ name, label, type = 'text', placeholder }: Props) => {
  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <Field className="input-field" name={name} type={type} placeholder={placeholder} />
      <ErrorMessage name={name} component="div" className="input-error" />
    </div>
  );
};
