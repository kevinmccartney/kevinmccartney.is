import classNames from 'classnames';
import React, { Dispatch } from 'react';

import {
  AboutMe,
  Experience,
  Footer,
  Header,
  Hero,
  SayHello,
  ToolsTrade,
} from 'modules/homepage/components';

import './homepage.css';
import { connect } from 'react-redux';
import { AppStoreState } from 'modules/core/models';
import { Action } from 'redux';
import { toggleTheme } from 'modules/core/redux/theme/theme';

const HomepageComponent = ({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) => {
  return (
    <div
      className={classNames({
        'h-screen': true,
        'w-screen': true,
        'font-mono': true,
        dark: theme === 'dark',
      })}
    >
      <div
        className={classNames({
          'dark:bg-black': true,
          'h-full': true,
          'flex-col': true,
          flex: true,
          'flex-column': true,
        })}
        id="app"
      >
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main className="dark:text-white text-gray-700 flex-grow-1 px-24 sm:px-48">
          <Hero />
          <AboutMe />
          <Experience />
          <ToolsTrade />
          <SayHello />
        </main>
        <Footer />
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppStoreState) => {
  const { theme } = state;

  return { theme };
};

const mapDispatchToProps = (dispatch: any) => ({
  toggleTheme: () => dispatch(toggleTheme()),
});

export const Homepage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomepageComponent);
