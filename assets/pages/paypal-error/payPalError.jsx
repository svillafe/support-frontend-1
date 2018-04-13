// @flow

// ----- Imports ----- //

import React from 'react';

import SimpleHeader from 'components/headers/simpleHeader/simpleHeader';
import Footer from 'components/footer/footer';
import QuestionsContact from 'components/questionsContact/questionsContact';
import ErrorIntroduction from 'components/errorIntroduction/errorIntroduction';
import PageSection from 'components/pageSection/pageSection';
import CtaLink from 'components/ctaLink/ctaLink';

import { statelessInit as pageInit } from 'helpers/page/page';
import { renderPage } from 'helpers/render';


// ----- Page Startup ----- //

pageInit();


// ----- Render ----- //

const content = (
  <div className="gu-content">
    <SimpleHeader />
    <ErrorIntroduction
      highlights={['PayPal Error']}
      headings={['Sorry, there was a', 'problem completing', 'your PayPal payment']}
    />
    <PageSection modifierClass="paypal-try-again">
      <p className="try-again">Please try again.</p>
      <CtaLink
        text="Support The Guardian"
        accessibilityHint="support the guardian"
        ctaId="support-the-guardian"
        url="/"
      />
    </PageSection>
    <QuestionsContact />
    <Footer />
  </div>
);

renderPage(content, 'paypal-error-page');
