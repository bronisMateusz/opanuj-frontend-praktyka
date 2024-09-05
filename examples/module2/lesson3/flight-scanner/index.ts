import { FlightFormSchema } from './models/FlightForm';

const form = document.querySelector('#flight-form') as HTMLFormElement;
const messagesList = document.querySelector('#messages') as HTMLUListElement;

const appendMessage = (message: string) => {
  const li = document.createElement('li');
  li.textContent = message;
  messagesList.appendChild(li);
};

const displayErrors = (errors: string[]) => {
  messagesList.className = 'text-red-500';
  errors.forEach((message) => appendMessage(message));
};

const displaySuccessMessage = (message: string) => {
  messagesList.className = 'text-green-500';
  appendMessage(message);
};

const clearMessages = () => {
  messagesList.classList.remove('text-red-500', 'text-green-500');
  messagesList.innerHTML = '';
}

const getFormData = (form: HTMLFormElement) => {
  const formData = new FormData(form);
  return {
    origin: formData.get('origin')?.toString() || '',
    destination: formData.get('destination')?.toString() || '',
    startDate: formData.get('startDate')?.toString() || '',
    endDate: formData.get('endDate')?.toString() || '',
    trip: formData.get('trip')?.toString() as 'one-way' | 'round-trip',
  };
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  clearMessages();

  const data = getFormData(form);
  const validation = FlightFormSchema.safeParse(data);

  if (!validation.success) {
    const errorMessages = validation.error.errors.map((error) => error.message);
    displayErrors(errorMessages);
  } else {
    displaySuccessMessage('Form successfully submitted!');
    form.reset();
  }
});
