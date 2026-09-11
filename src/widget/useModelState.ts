import { useCallback, useEffect, useState } from "react";
import type { AnyModel } from "./anywidgetModel";

/** The standard anywidget-with-React pattern (see https://anywidget.dev/en/react/): a piece of
 * state that reads its initial value from the anywidget model, re-renders on Python-side changes
 * pushed down over the comm (`model.on("change:<key>", ...)`), and pushes JS-side changes back up
 * (`model.set` + `model.save_changes`) the same way a Python trait update would. */
export function useModelState<T>(model: AnyModel, key: string): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => model.get(key) as T);

  useEffect(() => {
    const handler = () => setValue(model.get(key) as T);
    model.on(`change:${key}`, handler);
    return () => model.off(`change:${key}`, handler);
  }, [model, key]);

  const set = useCallback(
    (next: T) => {
      model.set(key, next);
      model.save_changes();
    },
    [model, key],
  );

  return [value, set];
}
