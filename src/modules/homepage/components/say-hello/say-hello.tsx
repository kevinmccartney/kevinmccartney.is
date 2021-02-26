export const SayHello = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(event);
  };
  return (
    <div className="max-w-720 m-auto mt-32 sm:mt-64">
      <h3 className="text-5xl dark:text-green-300 text-blue-500">Say Hello</h3>
      <form className="flex flex-col text-2xl mt-24" onSubmit={handleSubmit}>
        <div className="mb-24 flex">
          <label>
            Name:
            <input
              className="dark:border-yellow-300 border-pink-600 border-2 rounded-md p-8 bg-transparent w-336 mt-12"
              type="text"
              placeholder="Your Name"
            ></input>
          </label>
          <label className="ml-32">
            Email:
            <input
              className="dark:border-yellow-300 border-pink-600 border-2 rounded-md p-8 bg-transparent w-336 mt-12"
              type="text"
              placeholder="Your email"
            ></input>
          </label>
        </div>
        <label>
          Message:
          <textarea
            className="dark:border-yellow-300 border-pink-600 border-2 rounded-md p-8 bg-transparent w-full mt-12 min-h-128"
            placeholder="Message"
          ></textarea>
        </label>
        <input
          type="submit"
          className="mt-24 dark:bg-green-300 bg-blue-500 self-start text-white px-32 py-8"
          value="SEND"
        />
      </form>
    </div>
  );
};
