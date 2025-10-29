'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { hydrateCart } from '@/store/slices/cartSlice';
import { hydrateUser } from '@/store/slices/userSlice';

export default function StoreHydrator() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Hydrate both cart and user from localStorage
    dispatch(hydrateCart());
    dispatch(hydrateUser());
  }, [dispatch]);

  return null;
}
