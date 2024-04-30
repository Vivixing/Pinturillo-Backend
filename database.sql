-- public.songs definition

-- Drop table

-- DROP TABLE public.songs;

/*
CREATE TABLE public.songs (
	id uuid NOT NULL,
	title varchar(255) NOT NULL,
	artist varchar(255) NOT NULL,
	album varchar(255) NOT NULL,
	"year" int4 NOT NULL,
	genre varchar(255) NOT NULL,
	duration interval NULL,S
	CONSTRAINT songs_pkey PRIMARY KEY (id)
);S
*/

CREATE TABLE public.Categoria (
	idCategoria uuid NOT NULL,
	nombre varchar(255) NOT NULL,
	CONSTRAINT Categoria_pkey PRIMARY KEY (idCategoria)
);

CREATE TABLE public.Palabra (
	idPalabra uuid NOT NULL,
	texto varchar(45) NOT NULL,
	CONSTRAINT Palabra_pkey PRIMARY KEY (idPalabra)
);
CREATE TABLE public.SalaDeJuego (S
	idSala int NOT NULL,
	nombre varchar(255),
	idCategoria uuid NOT NULL,
	estado varchar(225) NOT NULL,

	CONSTRAINT SalaDeJuego_pkey PRIMARY KEY (idSala)
	FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
);

CREATE TABLE public.PalabraPorCategoria (S
	idPalabra uuid NOT NULL,
	idCategoria uuid NOT NULL,

	CONSTRAINT PalabraPorCategoria_pkey PRIMARY KEY (idPalabra, idCategoria)
	FOREIGN KEY (idPalabra) REFERENCES Palabra(idPalabra)
	FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
);