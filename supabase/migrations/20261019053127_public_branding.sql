set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_branding()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  select jsonb_strip_nulls(jsonb_build_object(
    'title', config->'title',
    'lightModeLogo', config->'lightModeLogo',
    'darkModeLogo', config->'darkModeLogo'
  ))
  from public.configuration
  where id = 1;
$function$
;



grant all on function public.get_branding() to anon;
grant all on function public.get_branding() to authenticated;
grant all on function public.get_branding() to service_role;
