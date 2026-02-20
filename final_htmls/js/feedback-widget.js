// ============================================================
// Feedback Widget - Simple button linking to Google Form
// Shows in bottom-left corner for all users
// ============================================================

(function() {
  'use strict';

  // Google Form URL
  const FEEDBACK_FORM_URL = 'https://docs.google.com/forms/d/1cL2lsQ4dakliJLYT-WLEXYk9OyhuBm2nIpRkPv1UqYs/viewform';

  // Create feedback button HTML
  const feedbackHTML = `
    <div id="feedbackWidget" class="feedback-widget">
      <a href="${FEEDBACK_FORM_URL}" target="_blank" rel="noopener noreferrer" class="feedback-btn" aria-label="Give Feedback">
        <i class="fa-solid fa-comment-dots"></i>
        <span class="feedback-btn-text">Feedback</span>
      </a>
    </div>
  `;

  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    /* Feedback Widget Styles */
    .feedback-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      font-family: 'Manrope', system-ui, sans-serif;
    }

    .feedback-btn {
      background: linear-gradient(135deg, #ec407a, #d81b60);
      color: white;
      border: none;
      border-radius: 50px;
      padding: 14px 24px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(236, 64, 122, 0.35);
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      text-decoration: none;
      font-family: inherit;
      animation: blinkPulse 2s ease-in-out infinite;
    }

    @keyframes blinkPulse {
      0%, 100% {
        opacity: 1;
        box-shadow: 0 8px 25px rgba(236, 64, 122, 0.35);
      }
      50% {
        opacity: 0.7;
        box-shadow: 0 8px 25px rgba(236, 64, 122, 0.6), 0 0 20px rgba(236, 64, 122, 0.4);
      }
    }

    .feedback-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(236, 64, 122, 0.45);
      color: white;
      animation: none;
      opacity: 1;
    }

    .feedback-btn:active {
      transform: translateY(0);
    }

    .feedback-btn i {
      font-size: 1.1rem;
    }

    .feedback-btn-text {
      font-weight: 600;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .feedback-widget {
        bottom: 16px;
        right: 16px;
      }

      .feedback-btn {
        padding: 12px 20px;
        font-size: 0.85rem;
      }

      .feedback-btn-text {
        display: none;
      }

      .feedback-btn {
        padding: 14px 18px;
      }
    }

    @media (max-width: 480px) {
      .feedback-widget {
        bottom: 16px;
        right: 16px;
      }
    }
  `;

  // Inject HTML and CSS when DOM is ready
  function initFeedbackWidget() {
    if (document.getElementById('feedbackWidget')) {
      return; // Already initialized
    }

    document.head.appendChild(style);
    document.body.insertAdjacentHTML('beforeend', feedbackHTML);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFeedbackWidget);
  } else {
    initFeedbackWidget();
  }
})();
