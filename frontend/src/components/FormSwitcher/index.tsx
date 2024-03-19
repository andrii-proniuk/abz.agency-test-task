import './styles.css';

export interface IFormInfo {
  title: string;
  key: string;
}

interface Props {
  forms: IFormInfo[];
  currentForm?: string;
  setCurrentForm: (key: string) => void;
}

function FormSwitcher({ forms, currentForm, setCurrentForm }: Props) {
  return (
    <ul className='form-switcher'>
      {
        forms.map(
          ({ title, key }) => {
            const classNames = ['form-switcher_item'];

            if (currentForm === key) {
              classNames.unshift('form-switcher_item_active');
            }

            return <li
              className={ classNames.join(' ') }
              key={ key }
              onClick={ () => setCurrentForm(key) }
            >
              { title }
            </li>
          }
        )
      }
    </ul>
  )
}

export default FormSwitcher;
