import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMeeting } from '@/services/meetingService.ts';

export const NewMeetingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.date.trim()) {
      setError('Wszystkie pola są wymagane');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const newMeeting = await createMeeting(formData);
      
      if (newMeeting) {
        alert('Spotkanie zostało utworzone pomyślnie!');
        navigate('/meetings');
      } else {
        setError('Nie udało się utworzyć spotkania');
      }
    } catch (err) {
      console.error('Błąd podczas tworzenia spotkania:', err);
      setError('Wystąpił błąd podczas tworzenia spotkania');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="row mb-2">
        <div className="column">
          <h2 className="mb-0">➕ Dodaj nowe spotkanie</h2>
        </div>
        <div className="column column-33">
          <div className="text-center">
            <button 
              type="button"
              onClick={() => navigate('/meetings')}
              className="button button-outline"
            >
              ← Anuluj
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <fieldset disabled={isSubmitting}>
            
            <label htmlFor="title">Nazwa spotkania</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="np. Spotkanie zespołu projektowego"
              required
            />

            <label htmlFor="date">Data spotkania</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="description">Opis spotkania</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              placeholder="Opisz cel spotkania, agenda, wymagania..."
              required
            />

            <button
              type="submit" 
              className={`button ${isSubmitting ? 'button-outline' : 'button-success'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? '⏳ Tworzenie spotkania...' : '✅ Utwórz spotkanie'}
            </button>
            
          </fieldset>
        </form>
      </div>

      <div className="text-center mt-2">
        <p className="text-muted">
          💡 <strong>Wskazówka:</strong> Dodaj szczegółowy opis, aby uczestnicy wiedzieli czego się spodziewać
        </p>
      </div>
    </div>
  );
};
