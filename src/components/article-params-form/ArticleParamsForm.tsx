import { clsx } from 'clsx';
import { useState, useRef } from 'react';
import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  type ArticleStateType,
  type OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import { useSidebarClose } from './useSidebarClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  appliedState: ArticleStateType;
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  appliedState,
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, setFormState] = useState(appliedState);
  const sidebarRef = useRef<HTMLElement | null>(null);

  useSidebarClose({
    sidebarRef,
    isSidebarOpen,
    onClose: () => setIsSidebarOpen(false),
  });

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onApply(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  const handleChange =
    (key: keyof ArticleStateType) =>
    (option: OptionType): void => {
      setFormState((prev) => ({ ...prev, [key]: option }));
    };

  return (
    <>
      <ArrowButton
        isOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      />
      <aside
        ref={sidebarRef}
        className={clsx(styles.container, { [styles.container_open]: isSidebarOpen })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" weight={800} uppercase align="left" size={31}>
            ЗАДАЙТЕ ПАРАМЕТРЫ
          </Text>
          <Select
            title="Шрифт"
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={handleChange('fontFamilyOption')}
          />
          <RadioGroup
            name="fontSize"
            title="РАЗМЕР ШРИФТА"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={handleChange('fontSizeOption')}
          />
          <Select
            title="ЦВЕТ ШРИФТА"
            selected={formState.fontColor}
            options={fontColors}
            onChange={handleChange('fontColor')}
          />
          <Separator />
          <Select
            title="ЦВЕТ ФОНА"
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={handleChange('backgroundColor')}
          />
          <Select
            title="ШИРИНА КОНТЕНТА"
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={handleChange('contentWidth')}
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
