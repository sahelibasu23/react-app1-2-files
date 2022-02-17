import React, { useReducer, useState } from 'react';
import './App.css';

const formReducer = (state, event) => {
  if(event.reset) {
   return {
     pens: '',
     count: 0,
     name: '',
     'gift-wrap': false,
   }
 }
 return {
   ...state,
   [event.name]: event.value
 }
}

function App() {
  const [formData, setFormData] = useReducer(formReducer, {
   count: 50,
 });
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = event => {
    event.preventDefault();
   setSubmitting(true);

   setTimeout(() => {
      setFormData({
       reset: true
     })
     setSubmitting(false);
   }, 3000)
 }

  const handleChange = event => {
   const isCheckbox = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  }
  return (
    <div className="wrapper">
      <h1>Order your favorite pens</h1>
      {submitting &&
       <div>
         You are submitting the following:
         <ul>
           {Object.entries(formData).map(([name, value]) => (
             <li key={name}><strong>{name}</strong>:{value.toString()}</li>
           ))}
         </ul>
</div>
     }
      <form onSubmit={handleSubmit}>
     <fieldset disabled={submitting}>
         <label>
           <p>Name</p>
            <input name="name" onChange={handleChange} value={formData.name || ''}/>
         </label>
       </fieldset>
        <fieldset disabled={submitting}>
         <label>
           <p>Pens</p>
           <select name="pens" onChange={handleChange} value={formData.pens || ''}>
               <option value="">--Please choose an option--</option>
               <option value="fountain">Fountain</option>
               <option value="ballpoint">Ballpoint</option>
               <option value="gel">Gel</option>
           </select>
         </label>
         <label>
           <p>Count</p>
             <input type="number" name="count" onChange={handleChange} step="1" value={formData.count || ''}/>
 
        </label>
         <label>
           <p>Gift Wrap</p>
             <input 
             checked={formData['gift-wrap'] || false}
             disabled={formData.pens !== 'fountain'}
             name="gift-wrap"
             onChange={handleChange}
             type="checkbox"
            />
         </label>
       </fieldset>
       <button type="submit" disabled={submitting}>Submit</button>
      </form>
    </div>
  );
}

export default App;
