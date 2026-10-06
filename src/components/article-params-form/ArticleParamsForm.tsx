import { clsx } from 'clsx';
import { useState, useRef, useEffect } from 'react';
import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  appliedState: typeof defaultArticleState;
  onApply: (state: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({
  appliedState,
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState(appliedState);
  const sidebarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent): void => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return (): void => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onApply(formState);
  };

  const handleReset = (e: React.FormEvent): void => {
    e.preventDefault();
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, { [styles.container_open]: isOpen })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" weight={800} uppercase align="left" size={31}>
            ЗАДАЙТЕ ПАРАМЕТРЫ
          </Text>
          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option) =>
              setFormState((prev) => ({ ...prev, fontFamilyOption: option }))
            }
          />
          <RadioGroup
            name="fontSize"
            title="РАЗМЕР ШРИФТА"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(option) =>
              setFormState((prev) => ({
                ...prev,
                fontSizeOption: option,
              }))
            }
          />
          <Select
            title="ЦВЕТ ШРИФТА"
            selected={formState.fontColor}
            options={fontColors}
            onChange={(option) =>
              setFormState((prev) => ({ ...prev, fontColor: option }))
            }
          />
          <Separator />
          <Select
            title="ЦВЕТ ФОНА"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(option) =>
              setFormState((prev) => ({ ...prev, backgroundColor: option }))
            }
          />
          <Select
            title="ШИРИНА КОНТЕНТА"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option) =>
              setFormState((prev) => ({ ...prev, contentWidth: option }))
            }
          />
          <div className={clsx(styles.bottomContainer)}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
