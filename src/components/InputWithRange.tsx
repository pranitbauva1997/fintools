import { Stack, Input, Cluster, RangeInput } from '@xypnox/xip-ui';

import styles from '../style/calc.module.css';
import { Show } from 'solid-js';


export const InputWithRange = (props: {
  label: string,
  description?: string,
  id: string,
  value: number,
  unit: string,
  onChange: (n: number) => void,
  range: {
    min: number,
    max: number,
    step: number,
  }
}) => {
  return (
    <>
      <Stack space="0.25em" class={styles["range-and-input"]}>
        <Cluster class={styles['number-input']} space={'0.25em'}>
          <label for={props.id}>{props.description ?? props.label}</label>
          <Cluster class={styles["input-group"]}>
            <Input
              type="number"
              value={props.value}
              onChange={(e) => props.onChange(Number(e.target.value))}
              placeholder=""
            />
            <div class="input-group-append">
              {props.unit}
            </div>
          </Cluster>
        </Cluster>
        <Stack class={styles['range-input']}>
          <RangeInput
            showValue={false}
            label={props.label}
            value={props.value}
            onChange={(e) => props.onChange(Number((e.target as HTMLInputElement).value))}
            {...props.range}
          />
        </Stack>
      </Stack>
    </>

  )
}

