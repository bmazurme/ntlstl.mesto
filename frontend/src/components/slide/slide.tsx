import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import { useGetCardByIdMutation } from '../../store';

import { MODAL_CONFIG } from '../../utils';
import { BASE_API_URL } from '../../utils/constants';

import style from './slide.module.css';

export default function Slide() {
  const params = useParams();
  const navigate = useNavigate();
  const [getCardById, { data: card }] = useGetCardByIdMutation();

  const getCard = async () => {
    if (params.id) {
      const result = await getCardById(params.id);
      const { error } = result as { error: FetchBaseQueryError | SerializedError; };

      if (error && (error as FetchBaseQueryError & { status: number; }).status === 404) {
        navigate('/not-found-page');
      }
    }
  };

  useEffect(() => {
    getCard();
  }, []);

  return (
    <AnimatePresence>
      <div className={style.slide}>
        <motion.img
          initial={{
            // opacity: 0,
            // scale: 0.175,
          }}
          animate={MODAL_CONFIG.ANIMATE}
          exit={MODAL_CONFIG.EXIT}
          src={`${BASE_API_URL}/files/${card?.link}` ?? ''}
          alt={card?.name ?? ''}
          className={style.image}
          height="100%"
          width="100%"
        />
        <p className={style.name}>{card?.name ?? ''}</p>
      </div>
    </AnimatePresence>
  );
}
