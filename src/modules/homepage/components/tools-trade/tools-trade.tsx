export const ToolsTrade = () => {
  const technologies = [
    {
      icon: 'html5',
      label: 'HTML5',
    },
    {
      icon: 'css3-alt',
      label: 'CSS3',
    },
    {
      icon: 'js-square',
      label: 'ES6',
    },
    {
      icon: 'aws',
      label: 'AWS',
    },
    {
      icon: 'git-alt',
      label: 'git',
    },
    {
      icon: 'node',
      label: 'Node.js',
    },
    {
      icon: 'npm',
      label: 'npm',
    },
    {
      icon: 'angular',
      label: 'Angular',
    },
    {
      icon: 'react',
      label: 'react',
    },
    {
      icon: 'sass',
      label: 'Sass',
    },
    {
      icon: 'yarn',
      label: 'Yarn',
    },
  ];

  const renderTechnologies = () =>
    technologies.map((x) => {
      return (
        <div className="flex flex-col items-center mt-64 git mr-64">
          <i className={`fab fa-${x.icon}`}></i>
          <p className="pt-8 text-2xl dark:text-white text-gray-700">
            {x.label}
          </p>
        </div>
      );
    });

  return (
    <div className="max-w-720 m-auto mt-32 sm:mt-64">
      <h3 className="text-5xl dark:text-green-300 text-blue-500">
        Tools of the Trade
      </h3>
      <div className="flex flex-wrap mt-24 dark:text-yellow-300 text-pink-600 text-8xl">
        {renderTechnologies()}
      </div>
    </div>
  );
};
