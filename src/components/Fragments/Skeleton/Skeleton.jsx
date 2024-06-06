/* eslint-disable react/prop-types */
const Skeleton = ({ className }) => {
  return <div className={`skeleton ${className}`}></div>;
};

const List = ({ total, className }) => {
  const skeletonArray = Array.from({ length: total }, (_, index) => (
    <Skeleton key={index} className={className} />
  ));
  return skeletonArray;
};

Skeleton.List = List;

export default Skeleton;
