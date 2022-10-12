import moment from 'moment';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useParams } from 'react-router-dom';

import EmployeeService from 'services/employee-service';
import { convertBase64Image } from 'main-helper';
import { removeKeys } from 'helper';

interface Props {
  formData: any;
  setFormData: any;
  employeeId: string;
  setLanguage: Dispatch<SetStateAction<Language[] | []>>;
}

export interface Language {
  skills?: string;
  language?: string;
  rate?: string;
  year?: number;
  letter?: string;
  file: string;
}

export const useLanguage = ({ formData, setFormData, employeeId, setLanguage }: Props) => {
  const languageIndex = useRef(-1);
  const { id } = useParams();
  const [toggle, setToggle] = useState<number>();
  const [educations, setEducations] = useState<Language[] | []>([]);
  const [updateEducation, setUpdateEducation] = useState({
    update: false,
    editInd: -1,
  });
  const { register, handleSubmit, errors, control, reset, watch } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddEduction = async (data: Language) => {
    const fileBase64 =
      data?.file && data?.file?.length > 0 && (await convertBase64Image(data.file[0]));
    const languageData = {
      ...data,
      skillLevel: data?.skills,
      ...(fileBase64 ? { file: `${fileBase64}` } : {}),
    };
    if (!languageData.file || Object.keys(languageData.file).length === 0) {
      removeKeys(languageData, ['file']);
    }
    removeKeys(languageData, ['skills']);
    setLanguage((current) => [...current, languageData]);
    const newEducations: Language[] = [...educations];
    const tempObj = {
      ...data,
      skillLevel: data?.skills,
    };
    if (languageIndex.current < 0) {
      newEducations.push(tempObj);
    } else {
      newEducations[languageIndex.current] = { ...tempObj };
      setUpdateEducation({ update: false, editInd: -1 });
    }
    setEducations([...newEducations]);
    setFormData({ ...formData, languageData: [...newEducations] });
    reset({});
    setToggle(-1);
    languageIndex.current = -1;
  };

  const handleEducation = (index: number) => {
    languageIndex.current = index;

    const data = educations.find((data, i) => i === index);
    reset({
      language: data?.language,
      year: data?.year,
      rate: data?.rate,
    });
  };

  const handleDeleteIndex = (index: number) => {
    const delLang = [...educations];
    delLang.splice(index, 1);
    setEducations([...delLang]);
  };

  const getUser = async () => {
    const res = await EmployeeService.getEmployee(id);
    setEducations(res?.data?.languages);

    const data = res?.data?.languages.map((item: any) => {
      removeKeys(item, ['_id']);
      return item;
    });

    setLanguage((current) => [...current, ...data]);
  };

  useEffect(() => {
    id && getUser();
    if (formData?.languageData !== undefined && Object.keys(formData?.languageData)?.length) {
      setEducations([...formData?.languageData]);
      setLanguage((current) => [...current, ...formData?.languageData]);
    }
  }, []);

  return {
    handleSubmit,
    register,
    errors,
    control,
    handleAddEduction,
    educations,
    handleEducation,
    activeEdit: languageIndex.current,
    handleDeleteIndex,
    toggle,
    setToggle,
  };
};

export const schema = yup.object().shape({
  language: yup.string().required('Language  is a required field'),
  // rate: yup.string().required('Rate is a required field'),
  year: yup
    .number()
    .required('Year is a required field')
    .typeError('Year is required & should be a number'),
  // file: yup
  //   .mixed()
  //   .test("required", "You need to provide a file", (file) => {
  //     if (file[0]) return true;
  //     return false;
  //   })
  //   .test("fileSize", "The file is too large", (file) => {
  //     return file[0] && file[0].size <= 2000000;
  //   }),
  skills: yup.string().required('Skills is a required field'),
});

export const columns = [
  {
    key: 'language',
    name: 'Language',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'rate',
    name: 'Rate',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'year',
    name: 'Year',
    alignText: 'center',
    width: '150px',
  },
  {
    key: 'skillLevel',
    name: 'Skill Level',
    alignText: 'center',
    width: '150px',
  },

  { key: 'actions', name: 'Actions', alignText: 'center', width: '200px' },
];

export const selectRates = [
  {
    value: '50 Percent',
    description: '50 Percent',
  },
  {
    value: '100 Percent',
    description: '100 Percent',
  },
  {
    value: '80 Percent',
    description: '80 Percent',
  },
];

export const languageArray = [
  'Abkhazian',
  'Afar',
  'Afrikaans',
  'Akan',
  'Albanian',
  'Amharic',
  'Arabic',
  'Aragonese',
  'Armenian',
  'Assamese',
  'Avaric',
  'Avestan',
  'Aymara',
  'Azerbaijani',
  'Bambara',
  'Bashkir',
  'Basque',
  'Belarusian',
  'Bengali',
  'Bihari languages',
  'Bislama',
  'Bosnian',
  'Breton',
  'Bulgarian',
  'Burmese',
  'Catalan, Valencian',
  'Central Khmer',
  'Chamorro',
  'Chechen',
  'Chichewa, Chewa, Nyanja',
  'Chinese',
  'Church Slavonic, Old Bulgarian, Old Church Slavonic',
  'Chuvash',
  'Cornish',
  'Corsican',
  'Cree',
  'Croatian',
  'Czech',
  'Danish',
  'Divehi, Dhivehi, Maldivian',
  'Dutch, Flemish',
  'Dzongkha',
  'English',
  'Esperanto',
  'Estonian',
  'Ewe',
  'Faroese',
  'Fijian',
  'Finnish',
  'French',
  'Fulah',
  'Gaelic, Scottish Gaelic',
  'Galician',
  'Ganda',
  'Georgian',
  'German',
  'Gikuyu, Kikuyu',
  'Greek (Modern)',
  'Greenlandic, Kalaallisut',
  'Guarani',
  'Gujarati',
  'Haitian, Haitian Creole',
  'Hausa',
  'Hebrew',
  'Herero',
  'Hindi',
  'Hiri Motu',
  'Hungarian',
  'Icelandic',
  'Ido',
  'Igbo',
  'Indonesian',
  'Interlingua (International Auxiliary Language Association)',
  'Interlingue',
  'Inuktitut',
  'Inupiaq',
  'Irish',
  'Italian',
  'Japanese',
  'Javanese',
  'Kannada',
  'Kanuri',
  'Kashmiri',
  'Kazakh',
  'Kinyarwanda',
  'Komi',
  'Kongo',
  'Korean',
  'Kwanyama, Kuanyama',
  'Kurdish',
  'Kyrgyz',
  'Lao',
  'Latin',
  'Latvian',
  'Letzeburgesch, Luxembourgish',
  'Limburgish, Limburgan, Limburger',
  'Lingala',
  'Lithuanian',
  'Luba-Katanga',
  'Macedonian',
  'Malagasy',
  'Malay',
  'Malayalam',
  'Maltese',
  'Manx',
  'Maori',
  'Marathi',
  'Marshallese',
  'Moldovan, Moldavian, Romanian',
  'Mongolian',
  'Nauru',
  'Navajo, Navaho',
  'Northern Ndebele',
  'Ndonga',
  'Nepali',
  'Northern Sami',
  'Norwegian',
  'Norwegian Bokmål',
  'Norwegian Nynorsk',
  'Nuosu, Sichuan Yi',
  'Occitan (post 1500)',
  'Ojibwa',
  'Oriya',
  'Oromo',
  'Ossetian, Ossetic',
  'Pali',
  'Panjabi, Punjabi',
  'Pashto, Pushto',
  'Persian',
  'Polish',
  'Portuguese',
  'Quechua',
  'Romansh',
  'Rundi',
  'Russian',
  'Samoan',
  'Sango',
  'Sanskrit',
  'Sardinian',
  'Serbian',
  'Shona',
  'Sindhi',
  'Sinhala, Sinhalese',
  'Slovak',
  'Slovenian',
  'Somali',
  'Sotho, Southern',
  'South Ndebele',
  'Spanish, Castilian',
  'Sundanese',
  'Swahili',
  'Swati',
  'Swedish',
  'Tagalog',
  'Tahitian',
  'Tajik',
  'Tamil',
  'Tatar',
  'Telugu',
  'Thai',
  'Tibetan',
  'Tigrinya',
  'Tonga (Tonga Islands)',
  'Tsonga',
  'Tswana',
  'Turkish',
  'Turkmen',
  'Twi',
  'Uighur, Uyghur',
  'Ukrainian',
  'Urdu',
  'Uzbek',
  'Venda',
  'Vietnamese',
  'Volap_k',
  'Walloon',
  'Welsh',
  'Western Frisian',
  'Wolof',
  'Xhosa',
  'Yiddish',
  'Yoruba',
  'Zhuang, Chuang',
  'Zulu',
];
