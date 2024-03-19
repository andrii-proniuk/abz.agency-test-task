import React, { useEffect, useState } from 'react';

import './styles.css';
import { getPositionsRequest } from '../../requests/get-positions.request';
import { PositionResponseDto } from '../../response-dto/position.response-dto';

interface IFormData {
  loading: boolean;
  positions?: PositionResponseDto[];
  error?: string;
}

function PositionsForm() {
  const [formData, setFormData] = useState<IFormData>({
    loading: false,
  });

  useEffect(() => {
    getPositionsRequest()
      .then((result) => {
        setFormData((prev) => ({ ...prev, positions: result.positions }));
      })
      .catch((error) => {
        setFormData((prev) => ({ ...prev, error: error?.message }))
      });
  }, []);

  const getContent = () => {
    if (formData.loading) {
      return <p>Loading positions...</p>;
    }

    if (formData.error) {
      return <p>Error: {formData.error}</p>
    }

    if (!formData?.positions?.length) {
      return <p>Positions not found</p>
    }

    return (
      <>
        <p>Found positions:</p>
        <ul className="positions-list">
          { formData.positions.map(({ id, name}) => <li className='positions-list_item' key={id}>{name}</li>) }
        </ul>
      </>
    )
  };

  return (
    <>
      { getContent() }
    </>
  );
}

export default PositionsForm;
