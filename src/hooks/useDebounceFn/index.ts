/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Description: 用来处理防抖函数的 Hook
 * @Author: ChenBingJie
 * @Date: 2020-05-27 17:44:06
 * @Last Modified by: ChenBingJie
 * @Last Modified time: 2020-06-10 14:33:55
 */

import { DependencyList, useRef, useCallback, useEffect } from 'react';

export interface ReturnValue<T extends any[]> {
  run: (...args: T) => void;
  cancel: () => void;
}

type noop = (...args: any[]) => any;

function useDebounceFn<T extends any[]>(
  fn: (...args: T) => any,
  wait: number
): ReturnValue<T>;
function useDebounceFn<T extends any[]>(
  fn: (...args: T) => any,
  deps: DependencyList,
  wait: number
): ReturnValue<T>;
function useDebounceFn<T extends any[]>(
  fn: (...args: T) => any,
  deps: DependencyList | number,
  wait?: number
): ReturnValue<T> {
  const $deps: DependencyList = (Array.isArray(deps)
    ? deps
    : []) as DependencyList;
  const $wait: number = typeof deps === 'number' ? deps : wait || 0;
  const isMounted = useRef(false);
  const timer = useRef<any>();
  const fnRef = useRef<noop>();
  fnRef.current = fn;

  const cancel = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
  }, []);

  const run = useCallback(
    (...args: any) => {
      cancel();
      timer.current = setTimeout(() => {
        if (fnRef.current) {
          fnRef.current(...args);
        }
      }, $wait);
    },
    [$wait, cancel]
  );

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      (() => {
        run();
        return cancel;
      })();
    }
  }, [...$deps, run]);

  useEffect(() => cancel, []);

  return {
    run,
    cancel,
  };
}

export default useDebounceFn;
