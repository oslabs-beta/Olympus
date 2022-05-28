import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';
import CardsList from '../src/components/Main/CardsList';
import CardsContainer from '../src/components/Main/CardsContainer';
import NewCardModal from '../src/components/Main/NewCardModal';
