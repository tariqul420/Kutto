import { Tree, TreeNode } from 'react-organizational-chart';

const PetAdoptionProcess = () => {
  return (
    <div className="flex justify-center my-8">
      <Tree lineWidth={'2px'} lineColor={'#6b7280'} lineBorderRadius={'10px'} label={<div className="bg-gray-200 dark:bg-dark-lite py-2 rounded-lg font-semibold">Browse Pets 🐹</div>}>
        <TreeNode label={<div className="bg-gray-200 dark:bg-dark-lite py-2 rounded-lg font-semibold">Submit Application 📝</div>}>
          <TreeNode label={<div className="bg-gray-200 dark:bg-dark-lite py-2 px-4 rounded-lg font-semibold">Meet the Pet 🤝</div>} />
          <TreeNode label={<div className="bg-gray-200 dark:bg-dark-lite py-2 px-4 rounded-lg font-semibold">Home Check 🏡</div>} />
        </TreeNode>
        <TreeNode label={<div className="bg-gray-200 dark:bg-dark-lite py-2 px-4 rounded-lg font-semibold">Take Your Pet Home 🎉</div>} />
      </Tree>
    </div>
  );
};

export default PetAdoptionProcess;
