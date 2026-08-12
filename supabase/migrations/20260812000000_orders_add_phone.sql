-- Kulanda — número de telemóvel do cliente
-- Passamos a pedir o telemóvel no checkout da Stripe (phone_number_collection)
-- para facilitar o contacto sobre entregas. Guardamos o valor devolvido pela
-- Stripe (customer_details.phone) na encomenda.

alter table orders add column phone text;
