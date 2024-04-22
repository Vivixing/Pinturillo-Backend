-- public.songs definition

-- Drop table

-- DROP TABLE public.songs;

CREATE TABLE public.songs (
	id uuid NOT NULL,
	title varchar(255) NOT NULL,
	artist varchar(255) NOT NULL,
	album varchar(255) NOT NULL,
	"year" int4 NOT NULL,
	genre varchar(255) NOT NULL,
	duration interval NULL,
	CONSTRAINT songs_pkey PRIMARY KEY (id)
);

CREATE TABLE public.Categoria (
	idCategoria uuid NOT NULL,
	nombre varchar(255) NOT NULL,
	CONSTRAINT Categoria_pkey PRIMARY KEY (idCategoria)
);