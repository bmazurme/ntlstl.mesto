import React from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { Link } from 'react-router-dom';

import { useUpdateCardMutation } from '../../store';

import Image from './components/image';
import LikeButton from './components/like-button';
import RemoveButton from './components/remove-button';

import useFormWithValidation from '../../hooks/use-form-with-validation';
import useUser from '../../hooks/use-user';

import style from './card.module.css';

export default function Card({ card, index }: { card: Card; index: number; }) {
  const user = useUser();
  const errorHandler = useErrorHandler();
  const { values, handleChange, resetForm } = useFormWithValidation({ name: card.name });
  const [updateCard] = useUpdateCardMutation();

  const onSubmit = async () => {
    try {
      if (user?.id === card.user_id) {
        if (values.name !== '') {
          await updateCard({ name: values.name, id: card.id });
        } else {
          resetForm({ name: card.name });
        }
      }
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <div className={style.card}>
      {user && <RemoveButton card={card} user={user} />}
      <Image card={card} index={index} />
      <div className={style.group}>
        <div className={style.box}>
          {user?.id === card.user_id
            ? (
              <input
                className={style.input}
                type="text"
                name="name"
                readOnly={user?.id !== card.user_id}
                value={values.name}
                onChange={handleChange}
                onBlur={onSubmit}
              />
            )
            : <h2 className={style.name}>{card.name}</h2>}
          <Link to={`/user/${card.user_id}`} className={style.user}>
            {card.user.name}
          </Link>
        </div>
        <LikeButton card={card} user={user} />
      </div>
    </div>
  );
}
