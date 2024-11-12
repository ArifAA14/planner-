'use client'
import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher({ textColor }: { textColor: string }) {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const full = locale === 'en' ? 'English' : 'العربية';

  return (
    <LocaleSwitcherSelect
      defaultValue={full}
      items={[
        {
          value: 'en',
          label: t('en')
        },
        {
          value: 'ar',
          label: t('ar')
        }
      ]}
      label={t('label')}
      textColor={textColor}
    />
  );
}