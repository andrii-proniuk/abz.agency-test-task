import { useState } from 'react';
import { runSeederRequest } from '../../requests/run-seeder.request';

import './styles.css';

interface ComponentData {
  loading: boolean;
  error?: string;
}

function SeederButton() {
  const [data, setData] = useState<ComponentData>({
    loading: false,
  });

  const onClickSeederButton = () => {
    setData((prev) => ({ ...prev, loading: true }));
    
    runSeederRequest()
      .then(() => alert('Users successfully added by seeder'))
      .catch((error) => alert(error?.message || 'Error while seeding data, try again'))
      .finally(() => setData((prev) => ({ ...prev, loading: false })));
  };

  return (
    <>
      <div className="seeder-button-wrap">
        <button disabled={ data.loading } onClick={ onClickSeederButton } className="seeder-button">
          { !data.loading ? 'Seed users' : 'Seeding users' }
        </button>
      </div>
    </>
  );
}

export default SeederButton;
