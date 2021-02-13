import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders the name title', () => {
    render(<App />);
    const nameTitleElement = screen.getByText(/Hello, I am Kevin McCartney/i);
    expect(nameTitleElement).toBeInTheDocument();
  });

  test('renders the role title', () => {
    render(<App />);
    const nameTitleElement = screen.getByText(/Engineer, mentor, & teacher/i);
    expect(nameTitleElement).toBeInTheDocument();
  });

  test('renders linkedin link', () => {
    render(<App />);
    const nameTitleElement = screen.getByTestId(
      'linkedin-link',
    ) as HTMLLinkElement;
    expect(nameTitleElement.href).toBe(
      'https://www.linkedin.com/in/kevinmccartney2',
    );
  });

  test('renders twitter link', () => {
    render(<App />);
    const nameTitleElement = screen.getByTestId(
      'twitter-link',
    ) as HTMLLinkElement;
    expect(nameTitleElement.href).toBe('https://twitter.com/kmccartneydev');
  });

  test('renders github link', () => {
    render(<App />);
    const nameTitleElement = screen.getByTestId(
      'github-link',
    ) as HTMLLinkElement;
    expect(nameTitleElement.href).toBe('https://github.com/kevinmccartney');
  });

  test('renders how i was made link', () => {
    render(<App />);
    const nameTitleElement = screen.getByTestId(
      'how-i-was-made-link',
    ) as HTMLLinkElement;
    expect(nameTitleElement.href).toBe(
      'https://github.com/kevinmccartney/kevinmccartney.is',
    );
  });
});
