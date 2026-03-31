/**
 * Functional component to wrap component children if `condition` is truthy.
 * To add wrapper if `condition` is falsy, pass falseWrapper function.
 */
export default function ConditionalWrapper({ condition, wrapper, falseWrapper,
    children }) {
  if (condition) {
    return wrapper(children);
  } else if (falseWrapper) {
    return falseWrapper(children);
  } else {
    return children;
  }
}
