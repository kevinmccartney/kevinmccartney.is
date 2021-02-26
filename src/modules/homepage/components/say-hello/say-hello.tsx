import { useState } from 'react';

export const SayHello = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log({
      name: nameFieldState,
      email: emailFieldState,
      message: messageFieldState,
    });
  };
  const [nameFieldState, updateNameFieldState] = useState('');
  const [emailFieldState, updateEmailFieldState] = useState('');
  const [messageFieldState, updateMessageFieldState] = useState('');

  const updateFormField = (
    field: 'name' | 'email' | 'message',
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    switch (field) {
      case 'name':
        updateNameFieldState(() => e.target.value);

        break;
      case 'email':
        updateEmailFieldState(() => e.target.value);

        break;
      case 'message':
        updateMessageFieldState(() => e.target.value);

        break;
      default:
        break;
    }
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
              value={nameFieldState}
              onChange={(e) => updateFormField('name', e)}
            ></input>
          </label>
          <label className="ml-32">
            Email:
            <input
              className="dark:border-yellow-300 border-pink-600 border-2 rounded-md p-8 bg-transparent w-336 mt-12"
              type="text"
              placeholder="Your email"
              value={emailFieldState}
              onChange={(e) => updateFormField('email', e)}
            ></input>
          </label>
        </div>
        <label>
          Message:
          <textarea
            className="dark:border-yellow-300 border-pink-600 border-2 rounded-md p-8 bg-transparent w-full mt-12 min-h-128"
            placeholder="Message"
            value={messageFieldState}
            onChange={(e) => updateFormField('message', e)}
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
