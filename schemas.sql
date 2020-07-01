create table qsoc_questions (
    id serial not null primary key,
    userid varchar not null,
    date date not null,
    text varchar not null,
    fuzzy int default(-1) not null,
    offtopic int default(-1) not null,
    valid int default(-1) not null
)

create table qsoc_answers (
    id serial not null primary key,
    qid int not null,
    userid varchar not null,
    date date not null,
    text varchar not null,
    level varchar default('Intermediate') not null
);

CREATE OR REPLACE FUNCTION public.qsoc_add_question(id_ character varying, userid_ character varying, txt character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
begin 
	insert into qsoc_questions (id, userid, text, date) 
	values (id_, userid_, txt, now()::date);
end;
$function$;