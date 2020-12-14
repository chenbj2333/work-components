/*
 * @Description: 用于代替useEffect，deps可以为对象类型
 * @Author: ChenBingJie
 * @Date: 2020-12-14 17:01:36
 * @Last Modified by: ChenBingJie
 * @Last Modified time: 2020-12-14 17:02:02
 */

import { useEffect, useRef } from 'react';
import { dequal as deepEqual } from 'dequal';

type UseEffectParams = Parameters<typeof useEffect>; // useEffect 的参数类型

type UseEffectReturn = ReturnType<typeof useEffect>; // useEffect 的返回值类型

type EffectCallback = UseEffectParams[0];

type DependencyList = UseEffectParams[1];

// 判断是不是原始值
const isPrimitive = (val: unknown) => {
  return val == null || /^[sbn]/.test(typeof val);
};

const checkDeps = (deps: DependencyList) => {
  if (!deps || !deps.length) {
    throw new Error('如果不存在依赖，请使用useEffect代替useDeepCompareEffect ');
  }
  if (deps.every(isPrimitive)) {
    throw new Error('如果依赖中每一个值都是原始类型，请使用useEffect代替useDeepCompareEffect');
  }
};

const useDeepCompareMemoize = (deps: DependencyList): DependencyList => {
  const ref = useRef<DependencyList>();
  const signalRef = useRef<Boolean>(false);

  if (!deepEqual(deps, ref.current)) {
    ref.current = deps;
    signalRef.current = !signalRef.current;
  }

  return [signalRef.current];
};

const useDeepCompareEffect = (callback: EffectCallback, dependencies: DependencyList): UseEffectReturn => {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(dependencies);
  }

  return useEffect(callback, useDeepCompareMemoize(dependencies));
};

export default useDeepCompareEffect;
