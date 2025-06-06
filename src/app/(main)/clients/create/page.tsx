
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { COUNTRIES, CLIENT_TYPES, BUSINESS_SECTORS, CLIENT_ORIGINS } from "@/lib/constants";
import { ArrowLeft, User, Building, Mail, Phone, Globe, PlusCircle, Wand2, XIcon, Edit3, Info, MapPin, Briefcase, Users as UsersIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const addClientFormSchema = z.object({
  avatarUrl: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  
  clientType: z.enum(["Empresa", "Particular", "Freelancer"]).optional(),
  taxId: z.string().optional(),
  addressStreet: z.string().optional(),
  addressCity: z.string().optional(),
  addressState: z.string().optional(),
  addressPostalCode: z.string().optional(),
  website: z.string().url().or(z.literal('')).optional(),
  businessSector: z.enum(["Tecnología", "Diseño", "Retail", "Salud", "Consultoría", "Educación", "Finanzas", "Manufactura", "Otro"]).optional(),
  clientOrigin: z.enum(["Referido", "Google", "Redes Sociales", "Publicidad Online", "Evento", "Otro"]).optional(),
  internalNotes: z.string().optional(),
});

type AddClientFormValues = z.infer<typeof addClientFormSchema>;

const defaultValues: Partial<AddClientFormValues> = {
  firstName: "",
  lastName: "",
  email: "",
  country: "United States", 
};

export default function CreateClientPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showBusinessDetails, setShowBusinessDetails] = React.useState(false);

  const form = useForm<AddClientFormValues>({
    resolver: zodResolver(addClientFormSchema),
    defaultValues,
    mode: "onChange", 
  });

  const onSubmit = (data: AddClientFormValues) => {
    console.log("New client data:", data);
    toast({
      title: "Client Created",
      description: `${data.firstName} ${data.lastName} has been successfully added.`,
    });
    router.push("/clients"); 
  };
  
  const watchedFirstName = form.watch("firstName");
  const watchedLastName = form.watch("lastName");
  const clientDisplayName = `${watchedFirstName || "New"} ${watchedLastName || "Client"}`.trim();
  const avatarInitials = `${(watchedFirstName?.[0] || 'N')}${(watchedLastName?.[0] || 'C')}`.toUpperCase();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-muted/40 p-4 py-8 md:p-8">
      <div className="w-full max-w-2xl"> {/* Adjusted max-width to better match image */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="shadow-xl rounded-xl overflow-hidden">
              <CardHeader className="bg-card p-6 border-b">
                <div className="flex items-center justify-between mb-6">
                  <Button variant="outline" size="sm" asChild className="font-medium text-xs h-8 px-3"> {/* Smaller button */}
                    <Link href="/clients"><ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Back to Clients</Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8" asChild>
                    <Link href="/clients"><XIcon className="h-5 w-5" /></Link>
                  </Button>
                </div>

                <div className="flex flex-col items-center text-center gap-2"> {/* Reduced gap */}
                  <Avatar className="h-24 w-24 border-2 border-primary/10 shadow-md"> {/* Adjusted size and border */}
                    <AvatarImage src={form.watch("avatarUrl") || `https://placehold.co/120x120.png?text=${avatarInitials}`} data-ai-hint="user avatar gradient" />
                    <AvatarFallback className="text-3xl bg-muted">{avatarInitials}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-2xl font-bold text-foreground mt-2">{clientDisplayName}</CardTitle>
                  <CardDescription className="font-light text-muted-foreground text-sm max-w-sm">
                    Fill in the details below to add a new client to your database.
                  </CardDescription>
                  <Button variant="link" size="sm" className="text-primary font-medium text-xs px-0 hover:text-primary/80">
                    <Wand2 className="h-3.5 w-3.5 mr-1"/> {/* Adjusted icon margin */}
                    Get help using AI to auto-fill client data
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><User className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>FIRST NAME</FormLabel>
                          <FormControl>
                            <Input placeholder="Alex" {...field} className="font-light bg-card text-sm"/>
                          </FormControl>
                          <FormMessage className="font-light text-xs"/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><User className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>LAST NAME</FormLabel>
                          <FormControl>
                            <Input placeholder="Johnson" {...field} className="font-light bg-card text-sm"/>
                          </FormControl>
                          <FormMessage className="font-light text-xs"/>
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><Mail className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>EMAIL ADDRESS</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="alex.johnson@example.com" {...field} className="font-light bg-card text-sm"/>
                          </FormControl>
                          <FormMessage className="font-light text-xs"/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><Phone className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>PHONE NUMBER</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 987-6543" {...field} className="font-light bg-card text-sm"/>
                          </FormControl>
                          <FormMessage className="font-light text-xs"/>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><Globe className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>COUNTRY</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="font-light bg-card text-sm">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="font-light text-sm">
                              {COUNTRIES.map(country => (
                                <SelectItem key={country} value={country}>{country}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="font-light text-xs"/>
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><Building className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>COMPANY NAME (OPTIONAL)</FormLabel>
                          <FormControl>
                            <Input placeholder="Tech Innovations Inc." {...field} className="font-light bg-card text-sm"/>
                          </FormControl>
                          <FormMessage className="font-light text-xs"/>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Separator className="my-6" />

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-semibold text-foreground">Business Details</h3>
                    <Button 
                      type="button" 
                      variant="outline"
                      size="sm"
                      className="text-xs font-medium h-8 px-3" /* Smaller button */
                      onClick={() => setShowBusinessDetails(!showBusinessDetails)}
                    >
                      {showBusinessDetails ? "Hide" : "Show"} Business Details <PlusCircle className={`ml-1.5 h-4 w-4 transition-transform ${showBusinessDetails ? 'rotate-45' : ''}`}/>
                    </Button>
                  </div>

                  {showBusinessDetails && (
                    <div className="space-y-6 pt-4 animate-accordion-down"> {/* Keep accordion animation if desired */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        <FormField
                          control={form.control}
                          name="clientType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><User className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>CLIENT TYPE</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger className="font-light bg-card text-sm"><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                                <SelectContent className="font-light text-sm">
                                  {CLIENT_TYPES.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                                </SelectContent>
                              </Select>
                              <FormMessage className="font-light text-xs"/>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="taxId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><Info className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>TAX ID / NIF</FormLabel>
                              <FormControl><Input placeholder="e.g., B12345678" {...field} className="font-light bg-card text-sm"/></FormControl>
                              <FormMessage className="font-light text-xs"/>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="addressStreet"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><MapPin className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>STREET ADDRESS</FormLabel>
                            <FormControl><Input placeholder="123 Main St" {...field} className="font-light bg-card text-sm"/></FormControl>
                            <FormMessage className="font-light text-xs"/>
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                        <FormField control={form.control} name="addressCity" render={({ field }) => (<FormItem><FormLabel className="text-xs font-medium text-muted-foreground">CITY</FormLabel><FormControl><Input placeholder="New York" {...field} className="font-light bg-card text-sm"/></FormControl><FormMessage className="font-light text-xs"/></FormItem>)} />
                        <FormField control={form.control} name="addressState" render={({ field }) => (<FormItem><FormLabel className="text-xs font-medium text-muted-foreground">STATE/PROVINCE</FormLabel><FormControl><Input placeholder="NY" {...field} className="font-light bg-card text-sm"/></FormControl><FormMessage className="font-light text-xs"/></FormItem>)} />
                        <FormField control={form.control} name="addressPostalCode" render={({ field }) => (<FormItem><FormLabel className="text-xs font-medium text-muted-foreground">POSTAL CODE</FormLabel><FormControl><Input placeholder="10001" {...field} className="font-light bg-card text-sm"/></FormControl><FormMessage className="font-light text-xs"/></FormItem>)} />
                      </div>
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><Globe className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>WEBSITE</FormLabel>
                            <FormControl><Input placeholder="https://example.com" {...field} className="font-light bg-card text-sm"/></FormControl>
                            <FormMessage className="font-light text-xs"/>
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                        <FormField control={form.control} name="businessSector" render={({ field }) => (<FormItem><FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><Briefcase className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>BUSINESS SECTOR</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="font-light bg-card text-sm"><SelectValue placeholder="Select sector" /></SelectTrigger></FormControl><SelectContent className="font-light text-sm">{BUSINESS_SECTORS.map(sector => <SelectItem key={sector} value={sector}>{sector}</SelectItem>)}</SelectContent></Select><FormMessage className="font-light text-xs"/></FormItem>)} />
                        <FormField control={form.control} name="clientOrigin" render={({ field }) => (<FormItem><FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><UsersIcon className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>CLIENT ORIGIN</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="font-light bg-card text-sm"><SelectValue placeholder="Select origin" /></SelectTrigger></FormControl><SelectContent className="font-light text-sm">{CLIENT_ORIGINS.map(origin => <SelectItem key={origin} value={origin}>{origin}</SelectItem>)}</SelectContent></Select><FormMessage className="font-light text-xs"/></FormItem>)} />
                      </div>
                      <FormField
                        control={form.control}
                        name="internalNotes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-medium text-muted-foreground flex items-center"><Edit3 className="h-3.5 w-3.5 mr-1.5 text-muted-foreground/70"/>INTERNAL NOTES</FormLabel>
                            <FormControl><Textarea placeholder="Private notes about the client..." {...field} className="font-light bg-card text-sm" rows={4}/></FormControl>
                            <FormMessage className="font-light text-xs"/>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 p-6 flex justify-end gap-3 border-t"> {/* Adjusted background */}
                <Button variant="outline" onClick={() => router.push("/clients")} className="font-medium">Cancel</Button>
                <Button type="submit" className="font-medium bg-primary text-primary-foreground hover:bg-primary/90">Save Client</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}

    