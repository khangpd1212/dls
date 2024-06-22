import axios from 'axios';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface TeraProps {
  children?: React.ReactNode;
}

interface ContentProps {
  is_verify?: boolean;
}

export const TeraContext = createContext({});

const TeraContainer: React.FC<TeraProps> = ({ children }) => {
  const [dataLicense, setDataLicense] = useState({
    is_verify: false,
    msg: 'Không tìm thấy license',
  });

  useEffect(() => {
    try {
      const TeraLicense = process.env.REACT_APP_TERA_LICENSE;
      if (TeraLicense) {
        const url = 'https://auth-api.teracrm.vn/api/check-license';
        axios
          .post(url, {
            license: TeraLicense,
          })
          .then((response) => {
            const status = response?.data?.code;
            const data = response?.data?.data;
            const msg = response?.data?.msg;
            if (status !== 200) {
              throw new Error(msg);
            }
            return setDataLicense({
              ...data,
              msg,
            });
          })
          .catch((error) => {
            throw new Error(error);
          });
      }
    } catch (error) {
      console.error(error);
      return setDataLicense({
        is_verify: false,
        msg: error?.message || 'Lỗi trong quá trình xác thực',
      });
    }
  }, []);

  const returnDefault = useMemo(() => {
    return {
      is_verify: dataLicense?.is_verify,
      license: dataLicense,
    };
  }, [dataLicense?.is_verify]);

  return (
    <TeraContext.Provider value={returnDefault}>
      {children}
    </TeraContext.Provider>
  );
};

interface TeraType extends React.FC<TeraProps> {}

const TeraProvider = TeraContainer as TeraType;

export function useTera() {
  return useContext(TeraContext) as ContentProps;
}

export default TeraProvider;
