"use client";

export default function Contact() {
  return (
    <div className="flex flex-col items-center px-6 py-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4 text-center">
        <h2 className="text-3xl font-medium">Nous contacter</h2>
        <p className="text-gray-600">
          Une question, un retour ou une idée d’amélioration ?
        </p>
        <p className="text-sm text-gray-500">
          Vos informations ne sont utilisées que pour vous répondre.
        </p>
      </div>

      {/* Form */}
      <form
        className="mt-16 w-full max-w-xl space-y-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm text-gray-600">
            Nom
          </label>
          <input
            id="name"
            type="text"
            placeholder="Votre nom"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm focus:border-gray-400 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-gray-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="votre@email.com"
            className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm focus:border-gray-400 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm text-gray-600">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            placeholder="Votre message"
            className="w-full resize-none rounded-md border border-gray-200 px-4 py-3 text-sm focus:border-gray-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Envoyer le message
        </button>
      </form>
    </div>
  );
}
