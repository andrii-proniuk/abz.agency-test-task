import React, { useState } from 'react';
import FormSwitcher, { IFormInfo } from './components/FormSwitcher';
import UsersForm from './components/UsersForm';
import PositionsForm from './components/PositionsForm';
import AddUserForm from './components/AddUserForm';
import SeederButton from './components/SeederButton';

import './App.css';

enum FormKeyEnum {
  Users = 'users',
  Positions = 'positions',
  AddUser = 'add-user',
}

const forms: IFormInfo[] = [
  {
    title: 'Users',
    key: FormKeyEnum.Users,
  },
  {
    title: 'Add user',
    key: FormKeyEnum.AddUser,
  },
  {
    title: 'Positions',
    key: FormKeyEnum.Positions,
  }
];

function App() {
  const [currentForm, setCurrentForm] = useState<string>();

  const getCurrentForm = () => {
    switch (currentForm) {
      case FormKeyEnum.Users:
        return <UsersForm />
      case FormKeyEnum.AddUser:
        return <AddUserForm />
      case FormKeyEnum.Positions:
        return <PositionsForm />
      default:
        return <p>Choose form</p>
    }
  }

  return (
    <div className="App">
      <div className="forms-wrap">
        <SeederButton />
        <FormSwitcher forms={ forms } currentForm={ currentForm } setCurrentForm={ setCurrentForm } />
        <div className="form">
          { getCurrentForm() }
        </div>
      </div>
    </div>
  );
}

export default App;
