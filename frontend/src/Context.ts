import React, { createContext, useState, ReactNode } from 'react';

interface ContextType {
    // определите тип вашего контекста
}

// Укажите начальное значение для вашего контекста (по желанию)
const initialValue: ContextType = {
    // инициализация значений
};

const Сontext = createContext<ContextType>(initialValue);

export default Сontext;