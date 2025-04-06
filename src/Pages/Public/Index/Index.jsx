import React from 'react';
import './Index.scss';
import Header_Index from '../../../Containers/Headers/Header_Index/Header_Index';
import * as Video from '../../../Imports/video';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

const Index = () => {

  const { t } = useTranslation();

  return (

    <div className='Index'>

      <Header_Index />

      <div className="Apresentation">
        <div className='Container'>
          <div className='Company_Info'>
            <div className="Contente">
              <span>{t("Turn data into decisions")}</span>
              <span>{t("Analyze the market like the pros — with Intri Stock by your side.")}</span>
              <span>{t("Because good investing doesn't depend on luck, but on clear, objective, and accessible information — and that's exactly what Intri Stock offers you.")}</span>
              <div className="Buttons">
                <Link>{t("Get started for free")}</Link>
                <Link>{t("View our plans")}</Link>
              </div>
            </div>
          </div>
          <div className='Video'>
            <div>
              <video autoPlay loop muted>
                <source src={Video.Presentation_Video} type='video/mp4'/>
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Index;