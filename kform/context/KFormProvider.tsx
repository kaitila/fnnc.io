import { createContext, useContext } from 'react'
import { KForm } from '../KForm';

const KFormContext = createContext<KForm | undefined>(undefined);

export const KFormProvider = ({ 
    form, children
}: {
    form: KForm,
    children: React.ReactNode
}) => {

  return (
    <KFormContext.Provider value={ form }>
      {children}
    </KFormContext.Provider>
  )
}

export const useKFormContext = () => {
    const form = useContext(KFormContext);
    if(!form) {
        throw new Error('useKForm cant be used outside KFormContext');
    }

    return form;
}