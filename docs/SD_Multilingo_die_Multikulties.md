Solution Design – Multilingo App

1. Überblick

-Dieses Solution Design beschreibt die technische und organisatorische Struktur der geplanten Multilingo‑App. Die fachlichen Details werden später in einzelnen Items (SCRUM Product Backlog Items) definiert. Dieses Dokument dient als Architektur‑ und Strukturgrundlage.

2. Zielsetzung

-Die Multilingo‑App digitalisiert die Sprachkursverwaltung eines Anbieters, der bisher ausschließlich mit Papier arbeitet. Ziel ist eine stabile, sichere und benutzerfreundliche Anwendung für zwei Rollen:

-Kursleiter

-Kursteilnehmer

3. Systemübersicht

-Die App besteht aus folgenden Hauptkomponenten:

3.1 Frontend

-Mobile App (iOS & Android)

-Rollenbasierte UI (Kursleiter/Kursteilnehmer)

-Anzeige und Verwaltung von Kursen, Bewertungen, Accountdaten

3.2 Backend

-REST‑API

-Authentifizierung & Autorisierung

-Kurs‑ und Teilnehmerverwaltung

-Bewertungslogik

-Preis‑ und Zahlungsdatenverwaltung

3.3 Datenbank

-Speicherung aller relevanten Daten:

-Benutzer

-Kurse

-Kurszuordnungen

-Bewertungen

-Preise

-Bankdaten

3.4 Sicherheit

-DSGVO‑konforme Speicherung

-Verschlüsselte Übertragung (HTTPS)

-Rollenbasierte Zugriffskontrolle

4. Architekturmodell

-Die Architektur folgt einem Client‑Server‑Modell mit klarer Trennung von Präsentation, Logik und Datenhaltung.

4.1 Schichtenmodell

-Presentation Layer: Mobile App

-Application Layer: Backend‑Services

-Data Layer: Relationale Datenbank

4.2 Schnittstellen

-REST‑API für alle CRUD‑Operationen

-Auth‑Service (Login/Registrierung)

5. Funktionsübersicht (High‑Level)

-Die folgenden Funktionen werden später in Items detailliert:

5.1 Kursleiter

-Kurs erstellen, bearbeiten, löschen

-Teilnehmer verwalten

-Bewertungen vergeben (Niveau erhöhen)

-Kursinformationen pflegen

5.2 Kursteilnehmer

-Registrierung & Login

-Kurse anzeigen

-Kursdetails einsehen (Preis, Datum, Niveau)

-Einschreibung in Kurse

-Accountdaten verwalten

6. Nichtfunktionale Anforderungen (NFA)

-Basierend auf den Vorgaben:

6.1 Benutzbarkeit

-Einfache Bedienung

-Messung durch User‑Workshop

6.2 Sicherheit

-Kein unautorisierter Zugriff

-Messung durch Stresstest

6.3 Ordnungsmäßigkeit

-Einhaltung gesetzlicher Vorschriften

-Anwalt erstellt Prüfliste

7. Datenmodell (High‑Level)

7.1 Hauptentitäten

-User (Kursleiter/Kursteilnehmer)

-Course

-Enrollment (Teilnehmer ↔ Kurs)

-Rating (Bewertungen)

-Pricing (Einzel/Gruppenunterricht)

7.2 Beziehungen

-Ein Kursleiter → mehrere Kurse

-Ein Kursteilnehmer → mehrere Kurse

-Ein Kurs → mehrere Bewertungen

8. Entwicklungsprozess

-Wir arbeiten nach SCRUM:

-Product Backlog

-Sprint Planning

-Sprint Backlog

-Iterative Entwicklung

-Items definieren später die fachlichen Details
-Start des ersten Sprints
