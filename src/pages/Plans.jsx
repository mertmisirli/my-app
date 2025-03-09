import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/Plans.css';

const Plans = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

  const plans = [
    {
      name: 'Başlangıç',
      price: billingCycle === 'monthly' ? 199 : 1990,
      features: [
        'Temel egzersiz programları',
        'Sınırlı video içeriği',
        'Forum erişimi',
        'Email desteği'
      ],
      recommended: false
    },
    {
      name: 'Premium',
      price: billingCycle === 'monthly' ? 299 : 2990,
      features: [
        'Özel egzersiz programları',
        'Sınırsız video içeriği',
        'Beslenme programı',
        '7/24 destek',
        'Kişisel antrenör'
      ],
      recommended: true
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? 499 : 4990,
      features: [
        'Premium özelliklerin tümü',
        '1-1 koçluk seansları',
        'Özel diyet planı',
        'Öncelikli destek',
        'Grup dersleri'
      ],
      recommended: false
    }
  ];

  const [selectedPlans, setSelectedPlans] = useState(plans); // Add this state


  const handlePlanSelect = (planName) => {
    console.log(`Selected plan: ${planName}`);

    setSelectedPlans(prevPlans =>
      prevPlans.map(plan => ({
        ...plan,
        recommended: plan.name === planName
      }))
    );
  };

  return (
    <>
      <Header />
      <div className="plans-container">
        <h1>Üyelik Planları</h1>

        <div className="billing-toggle">
          <span className={billingCycle === 'monthly' ? 'active' : ''}>Aylık</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={billingCycle === 'yearly'}
              onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            />
            <span className="slider round"></span>
          </label>
          <span className={billingCycle === 'yearly' ? 'active' : ''}>Yıllık</span>
          <br />
          {billingCycle === 'yearly' && <span className="discount-badge">%17 İndirim</span>}
        </div>


        <div className="plans-grid">
          {selectedPlans.map((plan) => (
            <div key={plan.name} className={`plan-card ${plan.recommended ? 'recommended' : ''}`}>
              {plan.recommended && <span className="recommended-badge">Önerilen</span>}
              <h2>{plan.name}</h2>
              <div className="price">
                <span className="currency">₺</span>
                <span className="amount">{plan.price}</span>
                <span className="period">/{billingCycle === 'monthly' ? 'ay' : 'yıl'}</span>
              </div>
              <ul className="features">
                {plan.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
              <button
                className={`select-plan-btn ${plan.recommended ? 'recommended' : ''}`}
                onClick={() => handlePlanSelect(plan.name)}
              >
                Planı Seç
              </button>
            </div>
          ))}
        </div>

        <div className="plans-footer">
          <p>Tüm planlar 14 gün ücretsiz deneme içerir</p>
          <p>İstediğiniz zaman iptal edebilirsiniz</p>
        </div>
      </div>
    </>
  );
};

export default Plans;
